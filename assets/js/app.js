    let addBtn = document.querySelector("button");
    let surnameInput = document.querySelector("input[name='s_surname']");
    let nameInput = document.querySelector("input[name='s_name']");
    let ageInput = document.querySelector("input[name='s_age']");
    let genderOption = document.querySelector("select");
    let table = document.querySelector("table");
    let popUp = document.querySelector("section");
    let counter = 0;
    let bodyBackground = document.querySelector("body");
    let iconClose = document.querySelector("i");
    let persons = [{
        s_surname: "Yusifli",
        s_name: "Kenan",
        s_age: "17",
        s_gender: "male"
    }];
    const updateNumbering = () => {
        counter = 0;
        const rows = table.querySelectorAll("tr");
        rows.forEach((row) => {
            const tdCounter = row.querySelector("td:first-child");
            if (tdCounter) {
                counter++;
                tdCounter.innerText = counter;
            };
        });
    };
    let checkRepeat = false;
    const editData = (person, tdSurname, tdName, tdAge, tdGender) => {
        console.log(persons);
        surnameInput.value = person.s_surname;
        nameInput.value = person.s_name;
        ageInput.value = person.s_age;
        genderOption.value = person.s_gender;
        // tr.remove();
        // persons = persons.filter(
        //     (p) =>
        //     p.s_surname !== person.s_surname ||
        //     p.s_name !== person.s_name ||
        //     p.s_age !== person.s_age
        // );
        addBtn.removeEventListener("click", addPerson);
        addBtn.addEventListener("click", (e) => updatePerson(e, tdSurname, tdName, tdAge, tdGender));
    };
    const showData = () => {
        let person = persons[persons.length - 1];
        counter++;
        let tdCounter = document.createElement("td");
        tdCounter.innerText = counter;
        let tdSurname = document.createElement("td");
        tdSurname.innerText = person.s_surname;
        let tdName = document.createElement("td");
        tdName.innerText = person.s_name;
        let tdAge = document.createElement("td");
        tdAge.innerText = person.s_age;
        let tdGender = document.createElement("td");
        tdGender.innerText = person.s_gender;
        let tdButtons = document.createElement("td");
        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        let removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        tdButtons.append(editButton, removeButton);
        let tr = document.createElement("tr");
        if (person.s_gender == "female") {
            tr.classList.add("female");
        } else if (person.s_gender == "male") {
            tr.classList.add("male");
        } else {
            tr.classList.add("error");
        }
        tr.append(tdCounter, tdSurname, tdName, tdAge, tdGender, tdButtons);
        table.appendChild(tr);
        removeButton.addEventListener("click", () => {
            tr.remove();
            checkRepeat = false;
            persons = persons.filter(
                (p) =>
                p.s_surname !== tdSurname.innerText ||
                p.s_name !== tdName.innerText ||
                p.s_age !== tdAge.innerText
            );
            updateNumbering();
        });
        editButton.addEventListener("click", () => {
            editData(person, tdSurname, tdName, tdAge, tdGender);
            popUp.classList.add("pop_up");
            bodyBackground.classList.add("body_background");
            iconClose.classList.remove("none");
        });
    };
    iconClose.addEventListener("click", () => {
        popUp.classList.remove("pop_up");
        bodyBackground.classList.remove("body_background");
        iconClose.classList.add("none");
    });
    const addPerson = (e) => {
        e.preventDefault();
        addSurname = surnameInput.value;
        addName = nameInput.value;
        addAge = ageInput.value;
        addGender = genderOption.value;
        let isDuplicate = persons.some(
            (p) =>
            p.s_surname === addSurname &&
            p.s_name === addName &&
            p.s_age === addAge
        );
        if (isDuplicate) {
            alert("Ele sey var!");
            return;
        }
        persons.push({
            s_surname: addSurname,
            s_name: addName,
            s_age: addAge,
            s_gender: addGender,
        });
        surnameInput.value = "";
        nameInput.value = "";
        ageInput.value = "";
        genderOption.value = "";
        showData();
    };
    const updatePerson = (e, tdSurname, tdName, tdAge, tdGender) => {
        e.preventDefault();
        console.log(persons);
        let personIndex = persons.findIndex((p) => p.s_surname == tdSurname.innerText &&
            p.s_name == tdName.innerText &&
            p.s_age == tdAge.innerText);
        tdSurname.innerText = surnameInput.value;
        tdName.innerText = nameInput.value;
        tdAge.innerText = ageInput.value;
        tdGender.innerText = genderOption.value;
        isDuplicate = persons.some(
            (p) =>
            p.s_surname === tdSurname.innerText &&
            p.s_name === tdName.innerText &&
            p.s_age === tdAge.innerText
        );
        if (isDuplicate) {
            alert("Bele bir sey var!");
            return;
        };
        persons[personIndex].s_surname = surnameInput.value;
        persons[personIndex].s_name = nameInput.value;
        persons[personIndex].s_age = ageInput.value;
        persons[personIndex].s_gender = genderOption.value;
        surnameInput.value = "";
        nameInput.value = "";
        ageInput.value = "";
        genderOption.value = "";
        console.log(persons);

        addBtn.removeEventListener("click", updatePerson);
        addBtn.addEventListener("click", addPerson);
    };
    addBtn.addEventListener("click", addPerson);
    showData();