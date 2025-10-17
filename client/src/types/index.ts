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
  status: string;
  action: string[];
}

export interface Complaint {
  id: string;
  subject: string;
  description: string;
  status: string;
  date: string;
  farmer: {
    name: string;
    id: string;
  };
  issueType: string;
  village: string;
  action: string[];
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
  status: 'Approved' | 'Pending' | 'Rejected';
  farmerEvidence: string[];
  bdaName: string;
  bdaEvidence: {
    cropConfirmed: boolean;
    qualityConfirmed: boolean;
    locationConfirmed: boolean;
    quantityConfirmed: boolean;
    images: string[];
  };
  remarks: string;
}
