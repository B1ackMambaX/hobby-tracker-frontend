import Layout from "@/components/layout/Layout.tsx";
import {Checkbox, VStack, Tabs, Tag, HStack, Button} from "@chakra-ui/react";

const TripPage = () => {
    return <Layout>
        <p style={{padding: '1rem'}}>
            <h1 style={{marginTop: '2rem', textAlign: 'center'}}>Информация о путешествии</h1>
            <Tabs.Root mt="4" defaultValue="tasks">
                <Tabs.List>
                    <Tabs.Trigger textAlign={"center"} width={"1/2"} value="tasks">
                        Чек-лист
                    </Tabs.Trigger>
                    <Tabs.Trigger textAlign={"center"} width={"1/2"} value="budget">
                        Бюджет
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="tasks">
                    <VStack gap="8">
                        <Checkbox.Root checked width={'full'}>
                            <Checkbox.HiddenInput/>
                            <Checkbox.Control/>
                            <Checkbox.Label>
                                <HStack>
                                    <p>Купить палатку</p>
                                    <Tag.Root>
                                        <Tag.Label>30.05.2025</Tag.Label>
                                    </Tag.Root>
                                </HStack>
                            </Checkbox.Label>
                        </Checkbox.Root>
                        <Checkbox.Root width={'full'}>
                            <Checkbox.HiddenInput/>
                            <Checkbox.Control/>
                            <Checkbox.Label>
                                <HStack>
                                    <p>Купить палатку</p>
                                    <Tag.Root>
                                        <Tag.Label>30.05.2025</Tag.Label>
                                    </Tag.Root>
                                </HStack>
                            </Checkbox.Label>
                        </Checkbox.Root>
                        <Checkbox.Root width={'full'}>
                            <Checkbox.HiddenInput/>
                            <Checkbox.Control/>
                            <Checkbox.Label>
                                <HStack>
                                    <p>Купить палатку</p>
                                    <Tag.Root>
                                        <Tag.Label>30.05.2025</Tag.Label>
                                    </Tag.Root>
                                </HStack>
                            </Checkbox.Label>
                        </Checkbox.Root>
                        <Checkbox.Root width={'full'}>
                            <Checkbox.HiddenInput/>
                            <Checkbox.Control/>
                            <Checkbox.Label>
                                <HStack>
                                    <p>Купить палатку</p>
                                    <Tag.Root>
                                        <Tag.Label>30.05.2025</Tag.Label>
                                    </Tag.Root>
                                </HStack>
                            </Checkbox.Label>
                        </Checkbox.Root>
                        <Button justifySelf={"end"}>Добавить</Button>
                    </VStack>

                </Tabs.Content>
                <Tabs.Content value="budget">
                </Tabs.Content>
            </Tabs.Root>
        </p>
    </Layout>
}

export default TripPage;