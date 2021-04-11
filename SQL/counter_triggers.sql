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
