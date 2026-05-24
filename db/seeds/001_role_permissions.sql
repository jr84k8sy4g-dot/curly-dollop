-- Wire default role → permission grants
WITH r AS (SELECT id, code FROM roles), p AS (SELECT id, code FROM permissions)
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM r, p WHERE
  (r.code = 'physician' AND p.code IN (
    'patient:read','patient:write','drug:read',
    'prescription:create','prescription:sign','analytics:read')) OR
  (r.code = 'pharmacist' AND p.code IN (
    'patient:read','drug:read','drug:write',
    'prescription:sign','prescription:dispense','analytics:read')) OR
  (r.code = 'nurse' AND p.code IN (
    'patient:read','drug:read','prescription:administer')) OR
  (r.code = 'admin' AND p.code IN (
    'drug:read','drug:write','user:manage','analytics:read')) OR
  (r.code = 'auditor' AND p.code IN ('audit:read','analytics:read'));
