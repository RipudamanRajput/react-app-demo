import { Card, Select, SkeletonPage, TextStyle } from "@shopify/polaris";
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Grosssales() {
    const options = {
        responsive: true,
        plugins: {
            // legend: {
            //     position: 'top' as const,
            // },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Monthly',
                data: [-1000, 1000, -500, 250, -600, 400],
                // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return (
        <Card>
            <Card.Header
                title="Gross Sales">
                <Select
                    placeholder="Sort By Yearly"
                    label={undefined} />
            </Card.Header>
            <Card.Section>
                <TextStyle variation="strong">
                    $ 1000
                </TextStyle>
                <Line options={options} data={data} />
                {/* <SkeletonPage fullWidth /> */}
            </Card.Section>
        </Card>
    )
}

export default Grosssales;