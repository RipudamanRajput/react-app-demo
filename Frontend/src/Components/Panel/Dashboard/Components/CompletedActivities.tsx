import { Card, Icon, Stack, TextStyle } from "@shopify/polaris";
import React from "react";
import { CircleTickMinor } from '@shopify/polaris-icons';

function CompletedActivities() {
    return (
        <Card
            title="Completed Activities"
            actions={[{
                content: "View all"
            }]}>
            <Card.Section>
                <Stack vertical >
                    <>
                        <Stack spacing="tight">
                            <Icon
                                source={CircleTickMinor}
                                color="primary"
                            />
                            <Stack
                                spacing="extraTight"
                                vertical>
                                <TextStyle variation="strong">
                                    Importing product(s) from Magento
                                </TextStyle>
                                <TextStyle>2022-11-26 08:02:35+00:00</TextStyle>
                            </Stack>
                        </Stack>
                        <hr />
                    </>
                    <>
                        <Stack spacing="tight">
                            <Icon
                                source={CircleTickMinor}
                                color="primary"
                            />
                            <Stack
                                spacing="extraTight"
                                vertical>
                                <TextStyle variation="strong">
                                    Importing product(s) from Magento
                                </TextStyle>
                                <TextStyle>2022-11-26 08:02:35+00:00</TextStyle>
                            </Stack>
                        </Stack>
                        <hr />
                    </>
                    <>
                        <Stack spacing="tight">
                            <Icon
                                source={CircleTickMinor}
                                color="primary"
                            />
                            <Stack
                                spacing="extraTight"
                                vertical>
                                <TextStyle variation="strong">
                                    Importing product(s) from Magento
                                </TextStyle>
                                <TextStyle>2022-11-26 08:02:35+00:00</TextStyle>
                            </Stack>
                        </Stack>
                        <hr />
                    </>
                    <>
                        <Stack spacing="tight">
                            <Icon
                                source={CircleTickMinor}
                                color="primary"
                            />
                            <Stack
                                spacing="extraTight"
                                vertical>
                                <TextStyle variation="strong">
                                    Importing product(s) from Magento
                                </TextStyle>
                                <TextStyle>2022-11-26 08:02:35+00:00</TextStyle>
                            </Stack>
                        </Stack>
                    </>
                </Stack>
            </Card.Section>
        </Card>
    )
}

export default CompletedActivities;