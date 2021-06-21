import { API } from 'config';

async function setItems(products){
    let items = [];
    products.map((item, index) => {
        let product = {};
        product.id = item.product._id;
        product.title = item.product.name;
        product.description = item.product.description;
        product.picture_url = `${API}/product/photo/${item.product._id}/0`;
        product.category_id = item.product.categories[0]._id;
        product.unit_price = item.product.price;
        product.quantity = item.quant;
        items.push(product);
    });

    return items;
}

async function setPayer(client){
    return {
        first_name: client.firstName,
        last_name: client.surname,
        phone: {
            area_code: client.cell.subst(0,1),
            number: client.cell.subst(2,10)
        },
        address: client.addresses[0]
    };
    
}

async function setReceiverAddress(address){
    return {
        receiver_address: {
            zip_code: address.cep,
            state_name: address.uf,
            city_name: address.localidade,
            street_name: address.logradouro,
            street_number: address.number
        }
    };
}

export const configPaymentInfo = (card) => {
    const body = {
        additional_info: {
            items: setItems(card.products),
            payer: setPayer(card.client),
            shipments: setReceiverAddress(card.freight.address),
            barcode: {}
        },
        description: 'Payment for product',
        external_reference: card._id,
        installments: card.installments,
        metadata: {},
        order: {
            type: 'mercadolibre'
        },
        payer: {
            entity_type: 'individual',
            type: 'customer',
            identification: { _id: card.client._id},
            phone: { cell: card.client.cell}
        },
        payment_method_id: card.payment_method,
        transaction_amount: card.total};
    return body;
};


