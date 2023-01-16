import { Card, ProgressBar, Stack, TextStyle } from "@shopify/polaris";
import React from "react";

function OngoingActivities() {
    return (
        <Card
            title="Ongoing Activities"
            actions={[{
                content: "View all"
            }]}>
            <Card.Section>
                <Stack vertical spacing="baseTight">
                    <TextStyle>
                        Product(s) syncing in progress...
                    </TextStyle>
                    <ProgressBar
                        progress={50}
                        size='small'
                        color="success" />
                    <TextStyle>
                        50 % Completed
                    </TextStyle>
                </Stack>
            </Card.Section>
        </Card>
    )
}
export default OngoingActivities;