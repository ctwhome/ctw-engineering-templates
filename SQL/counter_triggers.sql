-- The triggers will execute the following function, and then it will be called from the triggers.
create function update_num_organizations_in_sectors() returns trigger
    language plpgsql
as
$$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE sectors SET num_organizations = num_organizations + 1 WHERE id = NEW.sector_id;
        RETURN NULL;
    ELSEIF (TG_OP = 'DELETE') THEN
        UPDATE sectors SET num_organizations = num_organizations - 1 WHERE id = OLD.sector_id;
        RETURN NULL;
    ELSEIF (TG_OP = 'UPDATE') THEN
        UPDATE sectors SET num_organizations = num_organizations + 1 WHERE id = NEW.sector_id;
        UPDATE sectors SET num_organizations = num_organizations - 1 WHERE id = OLD.sector_id;
        RETURN NULL;
    END IF;
END
$$;



-- CREATION OF THE TRIGGERS FOR THE SECTOR TABLE (in this example)

create trigger update_num_organizations_in_sectors
    after update
    of sector_id on organizations
    for each row
execute procedure update_num_organizations_in_sectors();

create trigger insert_num_organizations_in_sectors
    after insert
    on organizations
    for each row
execute procedure update_num_organizations_in_sectors();

create trigger delete_num_organizations_in_sectors
    after delete
    on organizations
    for each row
execute procedure update_num_organizations_in_sectors();
