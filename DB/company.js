// 23. 创建company数据库 将it666和section集合导入数据库中
db.it666.find()
db.section.find()


// 24. 查询HTML5学院的所有老师

db.it666.findOne({"cname" : "HTML学院"})

var cno = db.it666.findOne({"cname" : "HTML学院"}).cno
db.section.find({"cno": cno})

// 25. 查询Java学院的所有老师
// 26. 查询工资大于20000的员工
// 27. 查询工资在10000-20000之间的员工
// 28. 查询工资小于10000或大于25000的员工
// 29. 为所有薪资低于10000的员工增加工资1000

// sort 排序

db.section.find().sort({bonus: 1})
db.section.find().sort({cno: -1, bonus: 1})  // 先降序  后升序

// 索引 即映射
db.section.find({}, {name:1, _id: 0, wages: 1}) // 1 映射出查询字段  0相反 也可忽略此参数 但是_id 列外

