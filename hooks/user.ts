import { graphqlclient } from "@/clients/api"
import { getCurrentUserQuery } from "@/graphql/query/user"
import { useQuery } from "@tanstack/react-query"

export const userCurrentUser = () => {
    const query = useQuery({
        queryKey: ["current-user"],
        queryFn: () => graphqlclient.request(getCurrentUserQuery)
    })

    return { ...query, user:query.data?.getCurrentUser };
}
