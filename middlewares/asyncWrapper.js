module.exports = (fn)=>{

    return (req,res,next)=>{
        fn(req,res,next).catch(next("error"))
    }

}

// the parameter is 




/*
async (req, res) => {
    const foundCource = await Courses.findById(req.params.id);
    if (!foundCource)
    return res.status(404).json({ status: "fail", data: foundCource });
    res.json({ status: "success", data: foundCource });
  
  }


*/