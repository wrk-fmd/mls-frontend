/**
 * This DTO represents a deletion event transmitted through STOMP
 */
export interface ReplayStartDto {
  replay: true;
  key: string;
}

/**
 * This function checks whether a passed object represents a deletion
 * @param object The object to check
 */
export function isReplayStart(object: any): object is ReplayStartDto {
  return object.replay && object.key !== undefined;
}
