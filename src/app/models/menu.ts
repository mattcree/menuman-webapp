import {MenuSections} from './menu-sections';

export interface Menu {
  id?: number;
  name: string;
  description: string;
  menuSection?: Array<MenuSections>;
}
