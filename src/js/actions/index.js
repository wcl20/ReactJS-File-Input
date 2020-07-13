import { UPLOAD } from "../constants/actionTypes";
import { services } from "../services";

export function upload(files) {
  return { type: UPLOAD, httpService: services.upload, params: [files] }
}
