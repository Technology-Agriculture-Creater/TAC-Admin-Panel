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
  cropQualityGrade?: string; // Added field
  feedback?: string; // Added field
  cropImages?: string[]; // Added field
  fullAddress?: string[];
  farmerId: {
    _id: string;
    name: {
      first: string;
      middle?: string;
      last: string;
    };
    mobileNumber: string;
    address?: {
      houseNo?: string;
      street?: string;
      villageOrCity?: string;
      district?: string;
      state?: string;
      country?: string;
      postalCode?: string;
    };
    farmerType?: string;
  };
  createdAt: string;
  updatedAt: string;
}


class ApiService {
  private baseURL = "https://apiadmin.technologyagriculturecreater.com/api";

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

    const response = await fetch(`${this.baseURL}/api/bdo/getAllCrops`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async getCropById(cropId: string): Promise<ApiResponse<Crop>> {
    const response = await fetch(
      `${this.baseURL}/api/bdo/getCropDetailsById/${cropId}`,
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
    cropId: string,
    status: "pending" | "active" | "sold" | "cancelled"
  ): Promise<ApiResponse<Crop>> {
    const response = await fetch(`${this.baseURL}/bdo/updateCropStatus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cropId, status }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
}

export const apiService = new ApiService();
export type { Crop, ApiResponse };
