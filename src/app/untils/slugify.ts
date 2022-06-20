const slugify = (title: string) => {
    title = title.replace(/^\s+|\s+$/g, "");

    title = title.toLowerCase();

    let original = title;

    let from = "àáảãạäăắằẳẵặâầấẩẫậđèéẻẽẹêềếểễệëìíỉĩịïîòóỏõọöôồốổỗộơờớởỡợùúủũụưừứửữựüûyỳýỷỹỵñç·/_,:;";

    let to = "aaaaaaaaaaaaaaaaaadeeeeeeeeeeeeiiiiiiioooooooooooooooooouuuuuuuuuuuuuyyyyyync------";

    for (let i = 0, l = from.length; i < l; i++) {
        title = title.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    title = title.replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

    if (title.replace(/^-$/g, "") === "") {
        title = original
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    }

    return title;
}

export default slugify;
