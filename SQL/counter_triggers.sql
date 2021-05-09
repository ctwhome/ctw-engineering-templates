--
-- Name: c_posts_voted(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION c_posts_voted() RETURNS trigger
    LANGUAGE plpgsql
    AS $$      BEGIN
        UPDATE "posts" SET voted_user_ids = array_append(voted_user_ids, NEW.user_id) WHERE "id" = NEW.post_id;
        RETURN NEW;
      END;
$$;


--
-- Name: cc_posts_comments_count(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION cc_posts_comments_count() RETURNS trigger
    LANGUAGE plpgsql
    AS $$        BEGIN
          IF (TG_OP = 'DELETE') THEN
            UPDATE "posts" SET "comments_count" = "comments_count" - 1 WHERE "id" = OLD.post_id;
            RETURN OLD;
          ELSIF (TG_OP = 'INSERT') THEN
            UPDATE "posts" SET "comments_count" = "comments_count" + 1 WHERE "id" = NEW."post_id";
            RETURN NEW;
          END IF;
        END;
$$;


-- Alternative example
CREATE OR REPLACE FUNCTION function_number_of_reviews() RETURNS TRIGGER AS

$BODY$

BEGIN

    if TG_OP='INSERT' then

       Update public."Listing" set number_of_reviews = number_of_reviews + 1 where id = new.listing_id;

    end if;

    if TG_OP='DELETE' then

        Update public."Listing" set number_of_reviews = number_of_reviews - 1 where id = old.listing_id;

    end if;

    RETURN new;

END;

$BODY$

language plpgsql;

CREATE TRIGGER trig_number_of_reviews

     AFTER INSERT OR DELETE ON public."Review"

     FOR EACH ROW

     EXECUTE PROCEDURE function_number_of_reviews();
