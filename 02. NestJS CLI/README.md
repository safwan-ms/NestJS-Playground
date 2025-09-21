
# NestJS CLI Generate Commands

This guide lists the most commonly used **NestJS CLI schematics** for quickly scaffolding your application.

---

## Core Schematics

1. Generate a **Module**  
```bash
nest g module users
```
Creates a new feature module (e.g., `users.module.ts`).

2. Generate a **Controller**  
```bash
nest g controller users
```
Creates a controller to handle incoming requests (e.g., `users.controller.ts`).

3. Generate a **Service**  
```bash
nest g service users
```
Creates a service provider for business logic (e.g., `users.service.ts`).

4. Generate a **Provider**  
```bash
nest g provider users
```
Creates a generic provider class (e.g., `users.provider.ts`).

---

## Quick Notes

- Use `--no-spec` to skip generating test (`.spec.ts`) files.  
- Use `--flat` to generate the file without creating a new folder.  
- Use `--dry-run` (`-d`) to preview the files without actually creating them.  

---

## Example Workflow

A typical feature setup for `users`:

```bash
nest g module users
nest g controller users
nest g service users
```

This generates:

```
src/users/
├── users.module.ts
├── users.controller.ts
├── users.controller.spec.ts
├── users.service.ts
└── users.service.spec.ts
```
