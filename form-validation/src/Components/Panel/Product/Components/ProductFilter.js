import { Button, Card, ChoiceList, Popover, Stack, TextField } from "@shopify/polaris";
import React, { useContext, useState } from "react";
import { UserContext } from '../Product'

function ProductGrid() {
    const [open, setopen] = useState(false);
    const { setSearch, Search, action, setaction } = useContext(UserContext);
    return (
        <Card>
            <Card.Section>
                <Stack>
                    <TextField
                        placeholder="Search "
                        value={Search}
                        onChange={(data) => {
                            setSearch(data)
                        }
                        } />
                    <Popover
                        active={open}
                        fullWidth
                        onClose={() => setopen(false)}
                        activator={<Button
                            onClick={() => setopen(!open)}>Customize Grid</Button>} >
                        <ChoiceList
                            allowMultiple
                            choices={[
                                {
                                    label: "Id",
                                    value: "id",
                                },
                                {
                                    label: "Shop ID",
                                    value: "shop_id"
                                }
                            ]}
                            selected={action}
                            onChange={(data) => { setaction(data) }}
                        />
                    </Popover>
                </Stack>
            </Card.Section>
        </Card>

    )
}

export default ProductGrid;