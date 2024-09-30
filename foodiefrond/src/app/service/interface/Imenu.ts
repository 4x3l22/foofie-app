import { MenuDto } from "./MenuDto";

export interface IMenu{
  success: boolean;
  loginDao: {
    id: number;
    roleId: number;
  };
  menuDto: MenuDto[];
}
