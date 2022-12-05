export interface ICategory {
  id: number;
  level: number;
  categoryName: string;
  categoryTitle: string;
  parentId: any;
  isLevelOne: boolean;
  children: Children[];
}

export interface Children {
  id: number;
  level: number;
  categoryName: string;
  categoryTitle: string;
  parentId: number;
  isLevelTwo: boolean;
  children: Children2[];
}

export interface Children2 {
  id: number;
  level: number;
  categoryName: string;
  categoryTitle: string;
  parentId: number;
  isLevelThree: boolean;
  children: any[];
}
