import {useGetTemplatesQuery} from "@/api/tripTemplateApi.ts";
import TripIdea from "@/components/tripIdea/TripIdea.tsx";
import Spinner from "@/components/ui/spinner/Spinner.tsx";
import {VStack, Switch} from "@chakra-ui/react";
import {useState} from "react";

const TemplatesList = () => {
    const {data: templates, isLoading} = useGetTemplatesQuery();
    const [userIdeas, setUserIdeas] = useState(false);

    const processIdeas = () => {
        if (templates && templates.length > 0) {
            return templates
                .filter(template => {
                    if (!userIdeas) {
                        return !('createdBy' in template);
                    }
                    return true;
                })
                .map((template) => (<TripIdea key={template._id!} {...template}/>))
        } else {
            return <p>Пока что нет идей</p>;
        }
    }

    return <VStack gap={'0.75rem'}>
        <Switch.Root checked={userIdeas} onCheckedChange={(e) => setUserIdeas(e.checked)} colorPalette="teal"
                     size="lg">
            <Switch.HiddenInput/>
            <Switch.Control/>
            <Switch.Label>Показывать идеи пользователей</Switch.Label>
        </Switch.Root>
        {isLoading ? <Spinner/> : processIdeas()}
    </VStack>
}

export default TemplatesList;