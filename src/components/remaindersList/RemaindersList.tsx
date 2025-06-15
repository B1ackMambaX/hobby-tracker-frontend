import {VStack} from "@chakra-ui/react";
import {useGetRemaindersQuery} from "@/api/remaindersApi.ts";
import RemainderItem from "@/components/remainderItem/RemainderItem.tsx";
import Spinner from "@/components/ui/spinner/Spinner.tsx";

const RemaindersList = () => {
    const {data: remainders, isLoading} = useGetRemaindersQuery();

    const getData = () => {
        if (isLoading) {
            return <Spinner />;
        }

        if (!remainders || remainders.length === 0) {
            return <p>На сегодня нет напоминаний</p>;
        }

        return remainders.map((remainder) => <RemainderItem key={remainder._id} remainder={remainder}/>)
    }

    return <VStack gap={'0.75rem'}>
        {getData()}
    </VStack>
}

export default RemaindersList;