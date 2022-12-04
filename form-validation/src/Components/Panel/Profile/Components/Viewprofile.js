import { Card, Layout, Page, Stack, TextStyle } from "@shopify/polaris";
import React from "react";
import { useLocation } from "react-router-dom";

function Viewprofile() {
    const { state } = useLocation();
    const { name, category, rules } = state;
    return (
        <>
            <Page
                fullWidth
                title="View Profile" >
                <Card
                    primaryFooterAction={{
                        content: "Go Back ",
                        onAction: () => window.history.go(-1)
                    }}>
                    <Card.Section >
                        <Stack vertical spacing="loose">
                            <Stack distribution="equalSpacing">
                                <TextStyle variation="strong">
                                    Name
                                </TextStyle>
                                <TextStyle>
                                    {name}
                                </TextStyle>
                            </Stack>
                            <Stack distribution="equalSpacing">
                                <TextStyle variation="strong">
                                    category
                                </TextStyle>
                                <TextStyle>
                                    {category}
                                </TextStyle>
                            </Stack>
                            <Stack distribution="equalSpacing">
                                <TextStyle variation="strong">
                                    Rules
                                </TextStyle>
                                <TextStyle>
                                    {rules}
                                </TextStyle>
                            </Stack>
                        </Stack>
                    </Card.Section>
                </Card>

            </Page>

        </>
    )
}

export default Viewprofile;