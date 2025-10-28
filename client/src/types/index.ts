export interface FarmerData {
  id: string;
  bdaId?: string;
  name: string;
  cropQty?: string;
  village: string;
  status: string;
  number?: string;
  farmer?: string | { name: string; id: string };
  bda?: {
    name: string;
    id: string;
  };
  taluka?: string;
  seller?: string | { name: string; id: string };
  buyer?: string | { name: string; id: string };
  complaintId?: string;
  issue?: string;
  raisedOn?: string;
}

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
  action: string[];
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
  status:
    | "Approved"
    | "Pending"
    | "Rejected"
    | "Pending review"
    | "In process"
    | "Completed"
    | "Disputed";
  action: string[];
  seller?: string;
}

export interface Complaint {
  id: string;
  subject: string;
  description: string;
  status: "Pending review" | "Resolved";
  date: string;
  farmer: {
    name: string;
    id: string;
  };
  issueType: string;
  village: string;
  action: string[];
  taluka?: string;
  raisedOn?: string;
  complaintId?: string;
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

export interface Activity {
  id: string;
  farmerName: string;
  village: string;
  crop: string;
  grade: string;
  sowingDate: string;
  harvestExpected: string;
  notes: string;
  minBid: string;
  maxBid: string;
  status:
    | "Approved"
    | "Pending"
    | "Rejected"
    | "Pending review"
    | "In process"
    | "Completed"
    | "Resolved"
    | "Disputed";
  farmerEvidence: string[];
  bdaName: string;
  bdaEvidence: {
    cropConfirmed: boolean;
    cropImage?: string;
    qualityConfirmed: boolean;
    qualityImage?: string;
    locationConfirmed: boolean;
    locationImage?: string;
    quantityConfirmed: boolean;
    quantityImage?: string;
  };
  remarks: string;
}
