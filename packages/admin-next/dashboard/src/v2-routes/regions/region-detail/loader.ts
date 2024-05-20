import { AdminRegionsRes } from "@medusajs/medusa"
import { Response } from "@medusajs/medusa-js"
import { adminRegionKeys } from "medusa-react"
import { LoaderFunctionArgs } from "react-router-dom"
import { queryClient } from "../../../lib/medusa"
import { sdk } from "../../../lib/client"

const regionQuery = (id: string) => ({
  queryKey: adminRegionKeys.detail(id),
  queryFn: async () =>
    sdk.admin.region.retrieve(id, { fields: "*payment_providers" }),
})

export const regionLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id
  const query = regionQuery(id!)

  return (
    queryClient.getQueryData<Response<AdminRegionsRes>>(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  )
}
