// 一对一

db.aAndb.insert([
   {name: "杨过", wife: {name: "小龙女", sex: "女"}, sex: "男"},
   {name: "令狐冲", wife: {name: "任盈盈", sex: "女"}, sex: "男"}
])  //  内嵌文档一对一

db.aAndb.find({})

// 一对多 微博与评论  通过id建立关系 一条微博 对应多条评论
db.weibo.insert([
    {weibo: "世界这么大，我想去看看"},
    {weibo: "我怎么这么帅"}
])

db.comments.insert([
    {weibo_id: ObjectId("5b8bed3c3d712133268ddbac"),
     list: [
        "你有钱吗",
        "一个人太孤单",
        "准了！"
     ]
    },
    {weibo_id: ObjectId("5b8bed3c3d712133268ddbad"),
     list: [
        "自恋狂",
        "我怎么没发现"
     ]
    },
])

db.weibo.find()
db.comments.find()

var weibo_id = db.weibo.findOne({"weibo" : "世界这么大，我想去看看"})._id
db.comments.find({weibo_id: weibo_id})

// 多对多
db.teacher.insert([
    {name: "陶行知"},
    {name: "叶圣陶"},
    {name: "郭沫若"}
])

db.teacher.find()

db.student.insert([
    {
        name: "胡汉三", // 一个学生对应两个老师
        t_id: [
            ObjectId("5b8bf0bb3d712133268ddbb2"),
            ObjectId("5b8bf0bb3d712133268ddbb3")
        ]        
    },
    {
        name: "赵雪莲", // 一个学生对应两个老师
        t_id: [
            ObjectId("5b8bf0bb3d712133268ddbb2"),
            ObjectId("5b8bf0bb3d712133268ddbb3"),
            ObjectId("5b8bf0bb3d712133268ddbb4")
        ]        
    }
    
])

db.teacher.find()
db.student.find()
// db.teacher.find({}, {$set: {stu: []}}) 添加字段 不能使用find（）
