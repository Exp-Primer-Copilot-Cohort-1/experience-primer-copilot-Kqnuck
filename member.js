function skillsMember() {
    var member = document.getElementById("member").value;
    var skills = document.getElementById("skills").value;
    var member = member.split("\n");
    var skills = skills.split("\n");

    var result = [];
    for (var i = 0; i < member.length; i++) {
        var memberSkills = skills[i].split(",");
        for (var j = 0; j < memberSkills.length; j++) {
            if (memberSkills[j] == "java") {
                result.push(member[i]);
                break;
            }
        }
    }
    document.getElementById("result").innerHTML = result.join("\n");
}