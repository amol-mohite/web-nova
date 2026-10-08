-- Allow authenticated users (admin) to SELECT and UPDATE enquiries

CREATE POLICY "auth_select_contact_enquiries"
ON contact_enquiries FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "auth_update_contact_enquiries"
ON contact_enquiries FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "auth_select_callback_requests"
ON callback_requests FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "auth_update_callback_requests"
ON callback_requests FOR UPDATE
TO authenticated
USING (true);
