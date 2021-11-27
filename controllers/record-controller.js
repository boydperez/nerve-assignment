const Record = require('./../models/record-model')
const AppError = require('./../utils/app-error');

exports.getAllRecords = async (req, res, next) => {
    try {
        const records = await Record.find().select('-_id');

        if (!records.length) return next(new AppError('No records found', 404));

        res.status(200).json({
            records
        });
    } catch(err) {
        next(err);
    };
};

exports.getRecord = async (req, res, next) => {
    try {
        const srNo = req.params.id;
        const record = await Record.findOne({ srNo }).select('-_id');

        if (!record) return next(new AppError('No record found with that Serial No', 404));

        res.status(200).json({
            record,
        });
    } catch(err) {
        next(err);
    }
};

exports.createRecord = async (req, res, next) => {
    try {
        const newRecord = await Record.create(req.body);

        res.status(201).json({
            record: {
                srNo: newRecord.srNo,
                name: newRecord.name
            },
        });
    } catch(err) {
        next(err);
    }
};

exports.updateRecord = async (req, res, next) => {
    try {
        const srNo = req.params.id;
        const updatedRecord = await Record.findOneAndUpdate({ srNo }, req.body, {
            new: true
        });

        if (!updatedRecord) return next(new AppError('No record found with that Serial No', 404));

        res.status(200).json({
            record: {
                srNo: updatedRecord.srNo,
                name: updatedRecord.name
            },
        });
    } catch(err) {
        next(err);
    }
};

exports.deleteRecord = async (req, res, next) => {
    try {
        const srNo = req.params.id;
        const record = await Record.findOneAndDelete({ srNo });

        if (!record) return next(new AppError('No record found with that Serial No', 404));

        res.status(204).json({
            record: null,
        });
    } catch(err) {
        next(err);
    }
};