const sellerModel = new (require('../../Models/seller/seller'))();
const { STATUS_CODES } = require('../../Configs/constants');

class sellerController {

    async Add(request, response) {
        try {
            let result = await sellerModel.Add(request.body);
            response.handler.success(result, 'STATUS.SUCCESS')
        } catch (error) {
            console.log(error);
        }
    }

    async AllAppointment(request, response) {
        try {
            let result = await sellerModel.AllAppointment(request.body);
            response.handler.success(result, 'STATUS.SUCCESS')
        } catch (error) {
            console.log(error);
        }
    }

    async AcceptRejectAppointment(request, response) {
        try {
            let result = await sellerModel.AcceptRejectAppointment(request.body);
            response.handler.success(result, 'STATUS.SUCCESS')
        } catch (error) {
            console.log(error);
        }
    }

    async Login(request, response) {
        try {
            let result = await sellerModel.Login(request.body);
            if (result)
                response.handler.success(result, 'STATUS.SUCCESS')
            else
                response.handler.notFound();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = sellerController;
