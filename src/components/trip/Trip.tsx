import {Button, Card, DataList, HStack, Tag} from "@chakra-ui/react";
import TripProps from "@/components/trip/trip.props.ts";

const Trip = ({name, startDate, endDate, budget, status}: TripProps) => {
    return <Card.Root width="full">
        <Card.Header>
            <Card.Title>{name}</Card.Title>
        </Card.Header>
        <Card.Body>
            <HStack gap={8}>
                <DataList.Root>
                    <DataList.Item>
                        <DataList.ItemLabel>Даты</DataList.ItemLabel>
                        <DataList.ItemValue>{`${startDate} - ${endDate}`}</DataList.ItemValue>
                    </DataList.Item>
                </DataList.Root>
                <DataList.Root>
                    <DataList.Item>
                        <DataList.ItemLabel>Бюджет</DataList.ItemLabel>
                        <DataList.ItemValue>{`${budget}₽`}</DataList.ItemValue>
                    </DataList.Item>
                </DataList.Root>
                <DataList.Root>
                    <DataList.Item>
                        <DataList.ItemLabel>Статус</DataList.ItemLabel>
                        <DataList.ItemValue><Tag.Root>
                            <Tag.Label>{status}</Tag.Label>
                        </Tag.Root></DataList.ItemValue>
                    </DataList.Item>
                </DataList.Root>
            </HStack>
        </Card.Body>
        <Card.Footer>
            <Button>Подробнее</Button>
        </Card.Footer>
    </Card.Root>
}

export default Trip;