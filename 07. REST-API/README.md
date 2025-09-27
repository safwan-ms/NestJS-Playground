# NestJS: Generate Resource (Employee)

In NestJS, the command

```bash
nest generate resource employee
```

(or shorthand: `nest g resource employee`)

generates a **CRUD boilerplate** for a new resource called **employee**.

---

## 📂 Generated Structure

After running the command, you’ll see a new `employee` folder under `src/`:

```
src/
 └── employee/
     ├── dto/
     │   ├── create-employee.dto.ts
     │   └── update-employee.dto.ts
     ├── entities/
     │   └── employee.entity.ts
     ├── employee.controller.ts
     ├── employee.module.ts
     └── employee.service.ts
```

---

## 📄 File Explanations

- **employee.module.ts**  
  Registers the `EmployeeService` and `EmployeeController` for dependency injection.

- **employee.controller.ts**  
  Handles incoming HTTP requests (`GET`, `POST`, `PATCH`, `DELETE`) and delegates to the service.

- **employee.service.ts**  
  Contains the business logic (CRUD methods like `create`, `findAll`, `findOne`, `update`, `remove`).

- **dto/create-employee.dto.ts**  
  Defines the structure of the request body for creating an employee.

- **dto/update-employee.dto.ts**  
  Defines the structure of the request body for updating an employee.

- **entities/employee.entity.ts**  
  A class representing the Employee entity (you can later map this to a DB schema if using Prisma/TypeORM).

---

## 🛠 Options with `nest g resource`

When you run `nest g resource employee`, Nest CLI will prompt you with:

1. **What transport layer do you use?**

   - REST API
   - GraphQL (code first)
   - GraphQL (schema first)
   - Microservice
   - WebSockets

2. **Would you like to generate CRUD entry points? (Y/n)**
   - If **yes**, the controller and service are scaffolded with CRUD methods.
   - If **no**, they’ll be empty boilerplate files.

---

## ✅ Example CRUD Methods (if you select REST + Yes to CRUD)

Inside `employee.controller.ts`, you’ll get:

```ts
@Post()
create(@Body() createEmployeeDto: CreateEmployeeDto) {
  return this.employeeService.create(createEmployeeDto);
}

@Get()
findAll() {
  return this.employeeService.findAll();
}

@Get(':id')
findOne(@Param('id') id: string) {
  return this.employeeService.findOne(+id);
}

@Patch(':id')
update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
  return this.employeeService.update(+id, updateEmployeeDto);
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.employeeService.remove(+id);
}
```

And `employee.service.ts` will have stubbed methods for each.

---

👉 So in short, `nest generate resource employee` = quick way to bootstrap a **module + controller + service + DTOs + entity** with optional CRUD endpoints.
