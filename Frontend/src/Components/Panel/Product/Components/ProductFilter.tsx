import { Button, Card, ChoiceList, Popover, Stack, TextField } from "@shopify/polaris";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../Product'

function ProductGrid() {
    const history = useNavigate()
    const [open, setopen] = useState(false);
    const { setSearch, Search, action, setaction } = useContext(UserContext);
    return (
        <Card>
            <Card.Section>
                <Stack>
                    <TextField
                        placeholder="Search "
                        label={undefined}
                        autoComplete="off"
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
                            title={undefined}
                            allowMultiple
                            choices={[
                                {
                                    label: "Id",
                                    value: "_id",
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
                    <Button
                        onClick={() => history('Add')}>
                        Add product
                    </Button>
                </Stack>
            </Card.Section>
        </Card>

    )
}

export default ProductGrid;