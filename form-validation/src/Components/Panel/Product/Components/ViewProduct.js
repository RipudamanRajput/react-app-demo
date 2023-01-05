import { Card, Layout, Page, Stack, TextStyle } from "@shopify/polaris";
import React from "react";
import { useLocation } from "react-router-dom";
import VarientGrid from "./VarientGrid";

function Viewproduct() {
    const { id, img, price, shop_id, status, varient, title } = useLocation().state;
    console.log(title, "bjsdgjh")

    return (
        <>
            <Page
                title="View Product"
                subtitle={id}
                fullWidth
                primaryAction={{
                    content:"Back",
                    onAction: () => window.history.go(-1)
                }}>
                <Layout>
                    <Layout.Section oneHalf>
                        <Card title="Product detail">
                            <Card.Section>
                                <Stack vertical>
                                    <Stack distribution="equalSpacing">
                                        <TextStyle variation="strong">Title</TextStyle>
                                        <TextStyle >{title}</TextStyle>
                                    </Stack>
                                    <Stack distribution="equalSpacing">
                                        <TextStyle variation="strong">Price</TextStyle>
                                        <TextStyle >{price}</TextStyle>
                                    </Stack>
                                    <Stack distribution="equalSpacing">
                                        <TextStyle variation="strong">Shop Id</TextStyle>
                                        <TextStyle >{shop_id}</TextStyle>
                                    </Stack>
                                    <Stack distribution="equalSpacing">
                                        <TextStyle variation="strong">Status</TextStyle>
                                        <TextStyle >{status}</TextStyle>
                                    </Stack>
                                </Stack>
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                    <Layout.Section oneHalf>
                        <Card title="Product image">
                            <Card.Section>
                                <img src={img} style={{objectFit:"cover" , borderRadius:"5px"}} width={123}  height={123}/>
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <Card title="Varients"> 
                            <Card.Section>
                                <VarientGrid data={varient} />
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        </>
    )
}
export default Viewproduct;