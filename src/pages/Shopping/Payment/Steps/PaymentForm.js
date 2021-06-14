import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField, FormControl, MenuItem, InputLabel, Select, FormLabel, Button } from '@material-ui/core/';

export default function PaymentForm() {
    return (
        <form action="/process_payment" method="post" id="paymentForm" >
            <Grid container spacing={2} style={{ padding: 30 }}>
                <Grid item md={12} xs={12}>
                    <Typography variant='h6'>Detalhe do comprador</Typography>
                </Grid>
                <Grid item md={12} xs={12}>
                    <FormControl variant="outlined" fullWidth>
                        <TextField itemID="email" label='E-mail' name="email" defaultValue="test@test.com" fullWidth variant="outlined" />
                    </FormControl>
                </Grid>
                <Grid item md={12} xs={12}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-label">Tipo do documento</InputLabel>
                        <Select id="docType" label='Tipo de documento' name="docType" data-checkout="docType" fullWidth >
                            <MenuItem value={10}>RG</MenuItem>
                            <MenuItem value={20}>CPF</MenuItem>
                        </Select >
                    </FormControl>
                </Grid>
                <Grid item md={12}>
                    <FormControl variant="outlined" fullWidth>
                        <TextField itemID="docNumber" label='Número do documento' name="docNumber" data-checkout="docNumber" fullWidth variant="outlined" />
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{ padding: 30 }}>
                <Typography variant='h6'>Detalhes do cartão</Typography>
                <Grid item md={12} xs={12}>
                    <FormControl variant="outlined" fullWidth>
                        <TextField variant="outlined" label='Titular do cartão' id="cardholderName" data-checkout="cardholderName" type="text" />
                    </FormControl>

                </Grid>
                <Grid item md={12} xs={12}>
                    <FormControl variant="outlined" fullWidth>
                        <FormLabel for="">Data de vencimento</FormLabel>
                        <Grid container>
                            <Grid item md={5} xs={5}>
                                <TextField variant="outlined" type="text" placeholder="MM" id="cardExpirationMonth" data-checkout="cardExpirationMonth"
                                    onselectstart="return false" onpaste="return false"
                                    oncopy="return false" oncut="return false"
                                    ondrag="return false" ondrop="return false" autocomplete='off' fullWidth />
                            </Grid>
                            <Grid item md={2} xs={2}>
                                <Typography style={{ textAlign: 'center', width: '100%', fontSize: 18 }} class="date-separator" fullWidth>/</Typography>
                            </Grid>

                            <Grid item md={5} xs={5}>
                                <TextField variant="outlined" type="text" placeholder="YY" id="cardExpirationYear" data-checkout="cardExpirationYear"
                                    onselectstart="return false" onpaste="return false"
                                    oncopy="return false" oncut="return false"
                                    ondrag="return false" ondrop="return false" autocomplete='off' fullWidth />
                            </Grid>


                        </Grid>

                    </FormControl>

                </Grid>

                <Grid item md={12} xs={12}>
                    <FormControl variant="outlined" fullWidth>
                        <TextField variant="outlined" label='Número do cartão' type="text" id="cardNumber" data-checkout="cardNumber"
                            onselectstart="return false" onpaste="return false"
                            oncopy="return false" oncut="return false"
                            ondrag="return false" ondrop="return false" autocomplete='off' />
                    </FormControl>

                </Grid>

                <Grid item md={12} xs={12}>
                    <FormControl variant="outlined" fullWidth>
                        <TextField variant="outlined" label='Código de segurança' id="securityCode" data-checkout="securityCode" type="text"
                            onselectstart="return false" onpaste="return false"
                            oncopy="return false" oncut="return false"
                            ondrag="return false" ondrop="return false" autocomplete='off' />
                    </FormControl>
                </Grid>

                <Grid item md={12} xs={12}>
                    <FormControl variant="outlined" id="issuerInput" fullWidth>
                        <InputLabel>Banco emissor</InputLabel>
                        <Select id="issuer" name="issuer" data-checkout="issuer"></Select>
                    </FormControl>

                </Grid>

                <Grid item md={12} xs={12}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Parcelas</InputLabel>
                        <Select type="text" id="installments" name="installments"></Select>
                    </FormControl>

                </Grid>

                <Grid item md={12} xs={12}>
                    <div>
                        <input type="hidden" name="transactionAmount" id="transactionAmount" value="100" />
                        <input type="hidden" name="paymentMethodId" id="paymentMethodId" />
                        <input type="hidden" name="description" id="description" />
                        <br />
                        <Button variant='contained' color='primary' type="submit">Pagar</Button>
                        <br />
                    </div>
                </Grid>

            </Grid>
        </form >
    );
}