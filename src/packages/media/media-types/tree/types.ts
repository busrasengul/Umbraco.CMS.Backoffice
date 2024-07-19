import type { UmbMediaTypeEntityType, UmbMediaTypeFolderEntityType, UmbMediaTypeRootEntityType } from '../entity.js';
import type { UmbTreeItemModel, UmbTreeRootModel } from '@umbraco-cms/backoffice/tree';

export interface UmbMediaTypeTreeItemModel extends UmbTreeItemModel {
	entityType: UmbMediaTypeEntityType | UmbMediaTypeFolderEntityType;
}

export interface UmbMediaTypeTreeRootModel extends UmbTreeRootModel {
	entityType: UmbMediaTypeRootEntityType;
}
