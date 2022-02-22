import { cadModel } from "../../models/index.js"

class modelSeeder {
  static async seed() {
    const  modelData = [
      {
        modelUrn:"dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YW9hZ2tuMXI5c21kaDdsYXdnYnl0dDVnYXNlYW10cGMtYnVja2V0MS9hcm0yXzE0LmlwdA==",
        modelName: "part1"
      }
    ]
    for ( const singleModelData of modelData) {
        const currentSingleModel = await cadModel.query().findOne(singleModelData)
        if(!currentSingleModel) {
          await cadModel.query().insert(singleModelData)
        }
      }
  }
}
export default modelSeeder