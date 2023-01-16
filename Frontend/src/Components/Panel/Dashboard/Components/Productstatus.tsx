

import { Badge, Card, SkeletonThumbnail, Stack, TextStyle } from "@shopify/polaris";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


function Productstatus() {
    const data = {
        responsive: true,
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Not Uploaded',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <Card
            title="Product(s)"
            actions={[{ content: "View All" }]}>
            <Card.Section>
                <Stack
                    alignment="center"
                    distribution="fillEvenly" >
                    <Stack vertical>
                        <Stack spacing="tight">
                            <Badge status="success">2500</Badge>
                            <TextStyle>Not Uploaded</TextStyle>
                        </Stack>
                        <Stack spacing="tight">
                            <Badge status="info">2500</Badge>
                            <TextStyle>Not Uploaded</TextStyle>
                        </Stack>
                        <Stack spacing="tight">
                            <Badge status="critical">2500</Badge>
                            <TextStyle>Not Uploaded</TextStyle>
                        </Stack>
                        <Stack spacing="tight">
                            <Badge status="warning">2500</Badge>
                            <TextStyle>Not Uploaded</TextStyle>
                        </Stack>
                    </Stack>
                    <Doughnut data={data} />
                    {/* <SkeletonThumbnail size="large" /> */}
                </Stack>
            </Card.Section>
        </Card>
    )
}

export default Productstatus;