interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  currentPage?: number;
  totalPages?: number;
  totalCrops?: number;
  count?: number;
}

interface Crop {
  _id: string;
  cropName: string;
  quantity: number;
  status: "pending" | "active" | "sold" | "cancelled";
  farmerId: {
    _id: string;
    name: string;
    mobileNumber: string;
    address?: string;
    farmerType?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface UpdateCropStatusRequest {
  cropId: string;
  status: "pending" | "active" | "sold" | "cancelled";
}

class ApiService {
  private baseURL = "http://localhost:8000/api";

  async getAllCrops(
    params: {
      page?: number;
      limit?: number;
      status?: string;
      cropName?: string;
    } = {}
  ): Promise<ApiResponse<Crop[]>> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.status) queryParams.append("status", params.status);
    if (params.cropName) queryParams.append("cropName", params.cropName);

    const response = await fetch(
      `${this.baseURL}/bdo/getAllCrops?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async getCropById(cropId: string): Promise<ApiResponse<Crop>> {
    const response = await fetch(
      `${this.baseURL}/bdo/getCropDetailsById/${cropId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async updateCropStatus(
    request: UpdateCropStatusRequest
  ): Promise<ApiResponse<Crop>> {
    const response = await fetch(`${this.baseURL}/bdo/updateCropStatus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
}

export const apiService = new ApiService();
export type { Crop, ApiResponse, UpdateCropStatusRequest };
