const sellerModel = new (require('../../Models/seller/seller'))();
const { STATUS_CODES } = require('../../configs/constants');

class sellerController {

    async Add(request, response) {
        try {
            let result = await sellerModel.Add(request.body);
            response.handler.success(result, 'STATUS.SUCCESS')
        } catch (error) {
            console.log(error);
        }

    }

    async List(request, response) {
        try {
            let result = await sellerModel.List();
            response.handler.success(result, 'STATUS.SUCCESS')
        } catch (error) {
            console.log(error);
        }
    }

    async ListWithSlot(request, response) {
        try {
            let result = await sellerModel.ListWithSlot();
            response.handler.success(result, 'STATUS.SUCCESS')
        } catch (error) {
            console.log(error);
        }
    }

    async Search(request, response) {
        try {
            let result = await sellerModel.Search(request.body);
            response.handler.success(result, 'STATUS.SUCCESS')
        } catch (error) {
            console.log(error);
        }
    }

    async BookAppointment(request, response) {
        try {
            let result = await sellerModel.BookAppointment(request.body);
            response.handler.success(result, 'STATUS.SUCCESS')
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = sellerController;
