/**
 * Created by dells on 2017/3/30.
 */
var fh={};
fh.server="/";
fh.tokenId="";//tokenId=118514
fh.clickDom="";//点击的当前的对象的缓存
fh.DOM={};
fh.ajax={};
fh.fn={};
fh.page={};
fh.page.pageStart=0;
fh.page.pageLength=10;
fh.page.pageIndex=1;//翻到第几页
fh.page.pageCount="";
fh.common={};
//fetalHeartInterface/gravidaMonitorCount.htm
//html%20V.201604/view/fetalHeart/pregnant.json
//btn fr
// fh.page.showContainer=$("tbody.zcf_container");
fh.dataClassification=function (index,_msg) {
    var _1,_2,_3,_4,_5,_6,_7,_8,
        arr=[];
    // _1=;
};


fh.DOM.makeFhTr=function (_result,index) {
    var data=_result,
        tr=$("<tr></tr>"),
        html="";
    if(typeof data!=="object"){
        return
    }
    // html+="<td style='display: none' class='zcf_dateID'></td>";
    html+="<td>"+(parseInt(index)+1)+"</td>";
    html+="<td>"+data.gravidaName+"</td>";
    html+="<td>"+data.bindHospitalName+"</td>";
    html+="<td>"+data.bindDoctorName+"</td>";
    html+="<td>"+data.gravidaAge+"</td>";
    html+="<td>"+data.gravidaPredictedStr+"</td>";
    html+="<td>"+data.gravidaMobile+"</td>";
    // html+="<td><div class='toe'>"+data.memo+"</div></td>";
    html+="<td><div class='flex-center'><div class='toe'>"+data.address+"</div></div></td>";
    html+="<td><a class='fh-list-info newuser-add'>个人记录</a><a class='fh-list-info delete'>删除</a></td>";
    tr.html(html);
    tr.find(".delete").data("gravidaId",data.gravidaId);
    tr.find(".newuser-add").data("gravidaId",data.gravidaId);
    return tr;
};
fh.ajax.common=function (obj) {
    if(typeof obj=="undefined"){
        throw new Error("obj undefined");
    }
    var _obj=obj;
    if(!_obj.url)throw new Error("_obj.url undefined");
    if(!_obj.data)throw new Error("_obj.data undefined");
    if(!_obj.fn)throw new Error("_obj.url undefined");


    $.ajax({
        type:_obj.type||"POST",
        url:_obj.url,
        dataType: _obj.dataType||"json",
        data:_obj.data,
        async: _obj.async||true,
        success: function(msg) {
            var _msg = msg;
            _obj.fn(msg);
            try {
                if(_obj.fn2){
                    _obj.fn2();
                }
            }catch (err){
                throw new Error(err);
            }
        },
        complete:function(){

        }
    });
};
fh.ajax.ajaxGetFirstShow=function (obj) {
    var data=obj||{};
    data.tokenId=fh.tokenId;
    data.type="1";
    data.pageSize="10";
    data.direction="1";
    // data.pageSize="10";
    $.ajax({
        type:"POST",
        url:fh.server+"fetalHeartInterface/gravidaMonitorCount.htm",
        dataType: "json",
        data:data,
        async: true,
        success: function(msg) {
            var _msg = msg;
            console.log("_msg",_msg);
            fh.fn.show(_msg,$("tbody.zcf_container2"));
        },
        complete:function(){

        }
    });
};
fh.ajax.addNewUser=function (_data) {
    if(typeof _data!=="object"){
        return
    };
    var data=_data;
    data.bindHospitalId="95719980";
    data.bindDoctorId="11520";
    data.bindHospitalName="rmd影像中心";
    data.bindDoctorName="杨利佳";
    data.emergencyRelation="1";
    data.tokenId=fh.tokenId;
    $.ajax({
        type:"POST",
        url:fh.server+"fetalHeartInterface/insertOrUpdateGravidaInfo.htm",
        dataType: "json",
        data:data,
        async: true,
        success: function(msg) {
            var _msg = msg;
            console.log("_msg",_msg);
        },
        complete:function(){

        }
    });
};
fh.fn.show=function (_msg,pageContainer) {
    var _msgR=_msg.consultList,
        // _result1=_msgR.result,
        _result,
        add,
        remove;
        pageContainer.children().remove();//移除所有页面数据
        if(_msgR.length==0){
            return
        }
    for(var i=fh.page.pageStart;i<fh.page.pageStart+fh.page.pageLength;i++){
        // _result=fh.dataClassification(i,_result1[i]);
        _result=fh.DOM.makeFhTr(_msgR[i],i);
        add=_result.find(".newuser-add");
        remove=_result.find(".delete");
        pageContainer.append(_result);
        add.click(function (e) {
            var e=e||event,
                data={},
                obj={};
            data.gravidaId=$(this).data("gravidaId");
            data.tokenId=fh.tokenId;
            obj.url=fh.server+"fetalHeartInterface/queryGravidaInfoById.htm";
            obj.data=data;
            obj.fn=function (_msg) {
                console.log("addPreganet",_msg);
                layer.open({
                    type: 1,
                    title: "孕妇资料",
                    shade: 0.5,
                    skin: 'layui-layer-rim',
                    area: ['auto', '520px'],
                    content: $('.newuser')
                });
            };
            fh.ajax.common(obj);
        });
        remove.click(function (e) {
            var e=e||event;
            console.log("remove");
            fh.clickDom=this;
            layer.open({
                type: 1,
                title: "删除",
                shade: 0.5,
                skin: 'layui-layer-rim',
                area: ['auto'],
                content: $('.remove_certain')
            });

        })
    }

};
fh.ajax.login=function () {
    var data={};
    data.loginName="13575796887";
    // data.channelType="bkzg";
    data.userType="2";
    data.channelType="00";
    data.terminalType="1";
    data.loginPwd=CryptoJS.MD5("Gan123").toString();
    data.version="1.0";
    $.ajax({
        type:"POST",
        url:fh.server+"interface/logIn.htm",
        dataType: "json",
        data:data,
        async: false,
        success: function(msg) {
            var _msg = msg,
                userInfo=_msg.userInfo;
                console.log(_msg);
                fh.tokenId=userInfo.tokenId;
            console.log("tokenId=118514",fh.tokenId)
        },
        complete:function(){

        }
    })
};
fh.ajax.getHospital=function () {
    var data={};
    data.tokenId=fh.tokenId;
    $.ajax({
        type:"POST",
        url:fh.server+"fetalHeartInterface/getFetalHospitals.htm",
        dataType: "json",
        data:data,
        async: false,
        success: function(msg) {
            var _msg = msg,
                userInfo=_msg.userInfo;
            console.log("hospital",_msg);
            // fh.tokenId=userInfo.tokenId;
            // console.log("tokenId=118514",fh.tokenId)
        },
        complete:function(){

        }
    })
};
fh.ajax.getDoctor=function () {
    var data={};
    data.tokenId=fh.tokenId;
    data.hospitalId="95719980";
    $.ajax({
        type:"POST",
        url:fh.server+"fetalHeartInterface/getGrantedDoctors.htm",
        dataType: "json",
        data:data,
        async: false,
        success: function(msg) {
            var _msg = msg,
                userInfo=_msg.userInfo;
            console.log("doctor",_msg);
            // fh.tokenId=userInfo.tokenId;
            // console.log("tokenId=118514",fh.tokenId)
        },
        complete:function(){

        }
    })
};
fh.ajax.login();
// function test() {
//     var pwd =  CryptoJS.MD5("Gan123").toString();
//     console.log(pwd);
// }
// test();
// fh.page={};
fh.ajax.ajaxGetFirstShow();
fh.common.collectDate=function () {
    var data={};
    $(".newuser [data-base]").each(function () {
        var _this=$(this);
        // console.log(this.tagName=="SPAN");
        this.tagName=="SPAN"?data[_this.attr("data-base")]=_this.text():data[_this.attr("data-base")]=_this.val();
    });
    return data;
};
$(document).ready(function (e) {
    var e=e||event;
    $("input.btn.fr").click(function (e) {
        var e=e||event,
            obj={};
            obj.startDateStr=$("#studyDateStart3").val();
            obj.endDateStr=$("#studyDateStart4").val();
        console.log("click");
        fh.ajax.ajaxGetFirstShow(obj);
    });
    $(".zcf_add").click(function (e) {
        var e=e||event,
            data=fh.common.collectDate();
        data.fetusCount=1;
        fh.ajax.addNewUser(data);
        fh.ajax.getDoctor();
        console.log("add");
    });
    $(".remove_certainY").click(function (e) {
        var e=e||event,
            data={},
            obj={};
        data.gravidaId=$(fh.clickDom).data("gravidaId");
        data.tokenId=fh.tokenId;
        obj.url=fh.server+"fetalHeartInterface/delGravida.htm";
        obj.data=data;
        obj.fn=function (msg) {
            console.log("remove",msg)
        };
        fh.ajax.common(obj);
    });
    $(".remove_certainN").click(function () {
        layer.closeAll();
    });
    fh.ajax.getHospital();
    fh.ajax.getDoctor();
});
