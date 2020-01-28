/**
 * This DTO represents a deletion event transmitted through STOMP
 */
export interface DeletionDto {
  deleted: true;
  id: number;
}

/**
 * This function checks whether a passed object represents a deletion
 * @param object The object to check
 */
export function isDeletion(object: any): object is DeletionDto {
  return object.deleted === true && object.id !== undefined;
}
