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

export interface Complaint {
  id: string;
  subject: string;
  description: string;
  status: "Pending" | "Resolved" | "In Review";
  date: string;
  farmer?: {
    name: string;
    id: string;
  };
  issue: string;
}

export interface Dispute {
  id: string;
  type: string;
  description: string;
  status: "Open" | "Closed" | "Pending Resolution";
  parties: string;
  date: string;
  farmer?: {
    name: string;
    id: string;
  };
  issue: string;
  createdAt: string;
}

export interface System {
  id: string;
  eventType: string;
  description: string;
  status: "Completed" | "In Progress" | "Warning";
  timestamp: string;
}
