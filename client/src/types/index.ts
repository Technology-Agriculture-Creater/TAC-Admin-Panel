export interface CropApproval {
  id: string;
  bda: {
    name: string;
    id: string;
  };
  cropQty: string;
  farmer: string;
  village: string;
  status: string;
}

export interface TradeActivity {
  id: string;
  cropQty: string;
  bda: string;
  bdaId: string;
  farmer: string;
  farmerId: string;
  village: string;
  buyer: string;
  buyerType: string;
  status: string;
}
