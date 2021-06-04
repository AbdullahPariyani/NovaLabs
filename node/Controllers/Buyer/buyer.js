const buyerModel = new (require('../../Models/buyer/buyer'))();
const { STATUS_CODES } = require('../../Configs/constants');

class buyerController {

    async Add(request, response) {
        try {
            let result = await buyerModel.Add(request.body);

            if (result)
                response.handler.success(result, 'STATUS.SUCCESS')
            else
                response.handler.notFound();
        } catch (error) {
            console.log(error);
        }

    }

    async List(request, response) {
        try {
            let result = await buyerModel.List();

            if (result)
                response.handler.success(result, 'STATUS.SUCCESS')
            else
                response.handler.notFound();
        } catch (error) {
            console.log(error);
        }
    }

    async BookAppointment(request, response) {
        try {
            let result = await buyerModel.BookAppointment(request.body);

            if (result)
                response.handler.success(result, 'STATUS.SUCCESS')
            else
                response.handler.notFound();
        } catch (error) {
            console.log(error);
        }
    }

    async Login(request, response) {
        try {
            let result = await buyerModel.Login(request.body);

            if (result)
                response.handler.success(result, 'STATUS.SUCCESS')
            else
                response.handler.notFound();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = buyerController;
