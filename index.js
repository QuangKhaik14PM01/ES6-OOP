class Person {
    constructor(name, address, code, email) {
      this.name = name;
      this.address = address;
      this.code = code;
      this.email = email;
    }
  }
  
  class Student extends Person {
    constructor(name, address, code, email, math, physics, chemistry) {
      super(name, address, code, email);
      this.math = math;
      this.physics = physics;
      this.chemistry = chemistry;
    }
  
    calculateAverage() {
      return (this.math + this.physics + this.chemistry) / 3;
    }
  }
  
  class Employee extends Person {
    constructor(name, address, code, email, workDays, dailySalary) {
      super(name, address, code, email);
      this.workDays = workDays;
      this.dailySalary = dailySalary;
    }
  
    calculateSalary() {
      return this.workDays * this.dailySalary;
    }
  }
  
  class Customer extends Person {
    constructor(name, address, code, email, companyName, orderValue, rating) {
      super(name, address, code, email);
      this.companyName = companyName;
      this.orderValue = orderValue;
      this.rating = rating;
    }
  }
  
  class ListPerson {
    constructor() {
      this.persons = [];
    }
  
    addPerson(person) {
      this.persons.push(person);
    }
  
    removePerson(code) {
      this.persons = this.persons.filter(person => person.code !== code);
    }
  
    updatePerson(updatedPerson) {
      const index = this.persons.findIndex(person => person.code === updatedPerson.code);
      if (index !== -1) {
        this.persons[index] = updatedPerson;
      }
    }
  
    sortByName() {
      this.persons.sort((a, b) => a.name.localeCompare(b.name));
    }
  
    filterByType(type) {
      return this.persons.filter(person => person instanceof type);
    }
  }
  
  const listPerson = new ListPerson();
  
  function addPerson() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const code = document.getElementById('code').value;
    const email = document.getElementById('email').value;
    const type = document.getElementById('type').value;
  
    let person;
  
    if (type === 'student') {
      const math = parseFloat(prompt('Enter Math Score:'));
      const physics = parseFloat(prompt('Enter Physics Score:'));
      const chemistry = parseFloat(prompt('Enter Chemistry Score:'));
      person = new Student(name, address, code, email, math, physics, chemistry);
    } else if (type === 'employee') {
      const workDays = parseInt(prompt('Enter Work Days:'));
      const dailySalary = parseFloat(prompt('Enter Daily Salary:'));
      person = new Employee(name, address, code, email, workDays, dailySalary);
    } else if (type === 'customer') {
      const companyName = prompt('Enter Company Name:');
      const orderValue = parseFloat(prompt('Enter Order Value:'));
      const rating = parseInt(prompt('Enter Rating:'));
      person = new Customer(name, address, code, email, companyName, orderValue, rating);
    }
  
    listPerson.addPerson(person);
    updatePersonList();
  }
  
  function removePerson(code) {
    listPerson.removePerson(code);
    updatePersonList();
  }
  
  function updatePersonList() {
    const personListElement = document.getElementById('personList');
    personListElement.innerHTML = '';
  
    listPerson.persons.forEach(person => {
      const listItem = document.createElement('li');
      listItem.textContent = `${person.name} - ${person.code} - ${person.email}`;
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => removePerson(person.code));
  
      listItem.appendChild(removeButton);
      personListElement.appendChild(listItem);
    });
  }

  function updatePerson() {
    const code = prompt('Enter Code of the person to update:');
    const updatedPerson = listPerson.persons.find(person => person.code === code);
  
    if (!updatedPerson) {
      alert('Person not found!');
      return;
    }
  
    const fieldToUpdate = prompt('Enter the field to update (name/address/email):');
    const newValue = prompt(`Enter the new value for ${fieldToUpdate}:`);
  
    updatedPerson[fieldToUpdate] = newValue;
  
    listPerson.updatePerson(updatedPerson);
    updatePersonList();
  }
  
  function sortByName() {
    listPerson.sortByName();
    updatePersonList();
  }
  
  function filterByType() {
    const type = prompt('Enter the user type to filter (student/employee/customer):');
    const filteredList = listPerson.filterByType(eval(type.charAt(0).toUpperCase() + type.slice(1)));
  
    const filteredListElement = document.getElementById('filteredList');
    filteredListElement.innerHTML = '';
  
    filteredList.forEach(person => {
      const listItem = document.createElement('li');
      listItem.textContent = `${person.name} - ${person.code} - ${person.email}`;
  
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => removePerson(person.code));
  
      listItem.appendChild(removeButton);
      filteredListElement.appendChild(listItem);
    });
  }