export interface BrandOutput {
  totalCount: number;
  items: Item[];
}

export interface Item {
  name: string;
  title: string;
  imageUrl: string;
  description: string;
  ownerName: string;
  ownerCompany: string;
  ownerIdentifier: string;
  ownerId: number;
  index: number;
  score: number;
  minimumOrderAmont: number;
  maximumOrderAmont: number;
  minimumOrderCount: number;
  maximumOrderCount: number;
  isLimitByAmount: boolean;
  isLimitByOrder: boolean;
  mandatoryNationalCode: boolean;
  hasSellBox: boolean;
  isActive: boolean;
  isWaitingForProduct: boolean;
  orderCount: number;
  itemList: any;
  id: number;
}

