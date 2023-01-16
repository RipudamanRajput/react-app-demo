import { Button, Card, Collapsible, Link, Stack, TextContainer } from "@shopify/polaris";
import { ChevronDownMinor, ChevronUpMinor } from '@shopify/polaris-icons';
import React, { useState } from "react";

function Faq() {
    const [open, setOpen] = useState(-1);
    const handleToggle = (data: any | number) => data == open ? setOpen(-1) : setOpen(data);
    return (
        <Card
            title="Frequently Asked Question "
            actions={[{
                content: "View All"
            }]}>
            <Card.Section>
                <Stack vertical spacing="loose">
                    {[1, 2, 3].map((data, index) => {
                        return (
                            <Card subdued key={index}>
                                <Button
                                    fullWidth
                                    ariaControls={`collapse ${index}`}
                                    ariaExpanded={open == index}
                                    icon={open == index ? ChevronUpMinor : ChevronDownMinor}
                                    onClick={() => handleToggle(index)}
                                    textAlign="left">
                                    How to delete the uploaded products from the TikTok seller center?
                                </Button>
                                <Collapsible
                                    open={open == index}
                                    id={`collapse ${index}`}
                                    transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                    expandOnPrint>
                                    <TextContainer>
                                        <p>
                                            Your mailing list lets you contact customers or visitors who
                                            have shown an interest in your store. Reach out to them with
                                            exclusive offers or updates about your products.
                                        </p>
                                        <Link url="#">Test link</Link>
                                    </TextContainer>
                                </Collapsible>
                            </Card>
                        )
                    })
                    }
                </Stack>
            </Card.Section>
        </Card>
    )
}

export default Faq;