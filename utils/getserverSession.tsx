import { getServerSession } from "next-auth"
import { authOptions } from "./auth"


export const serverSession = async () :Promise<any>=> {
    const options:any =  authOptions
  const session = await getServerSession(options)
  return session
}
