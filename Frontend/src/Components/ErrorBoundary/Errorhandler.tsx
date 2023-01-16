import { Button, Card, Heading, Stack, TextStyle } from "@shopify/polaris";
import React from "react";
import { useNavigate } from "react-router-dom";
import error from '../../Assets/Images/Error.jpg';

const Errorhandler = (props: any) => {
    return (
        <div className="Emptystate">
            <Card >
                <Card.Section>
                    <Stack
                        spacing="extraLoose"
                        distribution="center"
                        alignment="center"
                        vertical>
                        <>
                            <img src={error} width={350} alt='Error Image' />

                        </>
                        <Stack
                            distribution='center'
                            vertical
                            alignment="center"
                            spacing="extraTight">
                            <Heading >App Crashed !!!</Heading>
                            <TextStyle variation="subdued">{props.error.message}</TextStyle>
                        </Stack>
                    </Stack>
                </Card.Section>
            </Card>
        </div>

    )
}

export default Errorhandler;