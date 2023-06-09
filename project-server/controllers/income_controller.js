const IncomeDB = require("../dal/income_dal");

//create - post
exports.createNewIncome = async (req, res) => {
  console.log("body========", req.body);
  const incomeToInsert = req.body;
  console.log(incomeToInsert, "juiji")
  if (!incomeToInsert)
    return res.status(400).json({ message: 'not entried data' });
  const newIncome = await IncomeDB.createNewIncome(incomeToInsert);
  console.log(newIncome, "dddddd");
  if (newIncome)
    res.status(201).json({ message: 'created income' });
  // res.send(incomeToInsert)
  else
    res.status(400).json({ message: 'error' });
};

//getById-familyId
exports.getIncomeById = async (req, res) => {
  const fid = req.params.id;
  const month = req.query.month;
  const year = req.query.year;
  if (!fid)
    return res.status(400).json({ message: 'not entried id' });
  const thisIncome = await IncomeDB.getIncomeById(fid, month, year);
  if (thisIncome)
    res.send(thisIncome);
  else
    res.status(400).json({ message: 'error' });
};

exports.getIncomesSum = async (req, res) => {
  const f_id = req.params.id;
  const month = req.query.month;
  const year = req.query.year;
  if (!f_id)
    return res.status(400).json({ message: 'not entried id' });
  const incomesSum = await IncomeDB.getIncomesSum(f_id, month, year);
  if (!incomesSum) return res.status(400).json({ message: 'error' });
  var _totalSum = 0;
  incomesSum.forEach(e => {
    _totalSum += e.dataValues['sumOfMoney'];
  });
  res.send({ totalSum: _totalSum });
};


//delete-incomeId
exports.deleteIncome = async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res.status(400).json({ message: 'not entried id' });
  const flagDeleteIncome = await IncomeDB.deleteIncome(id);
  if (flagDeleteIncome)
    res.status(200).json({ message: "Deleted successfully" });
  else
    res.status(400).json({ message: 'error' });
};







