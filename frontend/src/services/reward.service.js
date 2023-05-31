import { http } from "../http-common";

class RewardDataService {
  getAll() {
    return http.get("/rewards");
  }
  getById(id) {
    return http.get(`/rewards/${id}`);
  }
  createReward(rewardObj) {
    const formData = new FormData();

    formData.append("name", rewardObj.name)
    formData.append("desc", rewardObj.desc)
    formData.append("completed", rewardObj.completed)

    formData.append("file", rewardObj.file, rewardObj.fileName)

    return http.post(`/rewards`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  deleteById(id) {
    return http.delete(`/rewards/${id}`);
  }
  editReward(id, rewardObj) {
    return http.put(`/rewards/${id}`, rewardObj);
  }
}

export const rewardDataService = new RewardDataService();
